import CustomError from '../errors/custom.error';
import {
  CUSTOMER_SUBSCRIPTION_MESSAGE_TYPES,
  NOTIFICATION_TYPE_RESOURCE_CREATED,
  CUSTOMER_CREATION_SUBSCRIPTION_MESSAGE_TYPE,
} from '../constants/constants';

import { decodeToJson } from '../utils/decoder.utils';
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_SUCCESS_ACCEPTED,
} from '../constants/http-status.constants';
import { readConfiguration } from '../utils/config.utils';
import { Request } from 'express';

export function isSelfCreatedChange(messageBody: any) {
  const resourceModifiedBy = messageBody.createdBy?.clientId;
  const currentConnectorClientId = readConfiguration().clientId;
  return resourceModifiedBy === currentConnectorClientId;
}

export function isCustomerSubscriptionMessage(messageBody: any) {
  return CUSTOMER_SUBSCRIPTION_MESSAGE_TYPES.includes(messageBody.type);
}

export function isCustomerCreatedMessage(messageBody: any) {
  return [CUSTOMER_CREATION_SUBSCRIPTION_MESSAGE_TYPE].includes(
    messageBody.type
  );
}

function isValidMessageType(messageBody: any) {
  return isCustomerSubscriptionMessage(messageBody);
}

export function doValidation(request: Request) {
  if (!request.body) {
    throw new CustomError(
      HTTP_STATUS_BAD_REQUEST,
      'Bad request: No Pub/Sub message was received'
    );
  }

  // Check if the body comes in a message
  if (!request.body.message) {
    throw new CustomError(
      HTTP_STATUS_BAD_REQUEST,
      'Bad request: Wrong No Pub/Sub message format - Missing body message'
    );
  }

  if (!request.body.message.data) {
    throw new CustomError(
      HTTP_STATUS_BAD_REQUEST,
      'Bad request: Wrong No Pub/Sub message format - Missing data in body message'
    );
  }
  const encodedMessageBody = request.body.message.data;
  const messageBody = decodeToJson(encodedMessageBody);

  // Make sure incoming message contains correct notification type
  if (NOTIFICATION_TYPE_RESOURCE_CREATED === messageBody.notificationType) {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `Incoming message is about subscription resource creation. Skip handling the message.`
    );
  }

  if (!isValidMessageType(messageBody)) {
    throw new CustomError(
      HTTP_STATUS_BAD_REQUEST,
      `Message type ${messageBody.type} is incorrect.`
    );
  }

  // Make sure incoming message contains the identifier of the created resource
  const resourceTypeId = messageBody?.resource?.typeId;
  const resourceId = messageBody?.resource?.id;

  if (isCustomerSubscriptionMessage(messageBody)) {
    if (resourceTypeId !== 'customer' || !resourceId) {
      throw new CustomError(
        HTTP_STATUS_BAD_REQUEST,
        ` No customer ID is found in message.`
      );
    }
    if (messageBody.customer && !messageBody.customer?.email) {
      throw new CustomError(
        HTTP_STATUS_BAD_REQUEST,
        `Customer (ID=${resourceId}) does not have an email address. Skip handling the message.`
      );
    }
  }

  if (isSelfCreatedChange(messageBody)) {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `Incoming message (ID=${messageBody.id}) is about change of ${messageBody.type} created by the current connector. Skip handling the message.`
    );
  }
}
