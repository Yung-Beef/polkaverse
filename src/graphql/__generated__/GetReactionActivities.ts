/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventName } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetReactionActivities
// ====================================================

export interface GetReactionActivities_accountById_activities_account {
  __typename: "Account";
  /**
   * The account's public key converted to ss58 format for the Subsocial chain (prefix "28")
   */
  id: string;
}

export interface GetReactionActivities_accountById_activities_post {
  __typename: "Post";
  /**
   * The Post ID, the same as it is on the blockchain.
   */
  id: string;
}

export interface GetReactionActivities_accountById_activities {
  __typename: "Activity";
  /**
   * A One-To-One relationship with the Account that initiated the current activity (it's usually a caller Account)
   */
  account: GetReactionActivities_accountById_activities_account;
  /**
   * The block height when an activity was done
   */
  blockNumber: any;
  /**
   * The event's index in the block
   */
  eventIndex: number;
  /**
   * The event's name
   */
  event: EventName;
  /**
   * The DateTime when the current activity was done
   */
  date: any;
  /**
   * The total number of Activities of the same event type for a specific Account.
   */
  aggCount: any;
  /**
   * Is this Activity the most recent in the list of Activities of this type (same event) from this account?
   */
  aggregated: boolean | null;
  /**
   * A One-to-One relationship with the Post that is involved in the current Activity
   */
  post: GetReactionActivities_accountById_activities_post | null;
}

export interface GetReactionActivities_accountById {
  __typename: "Account";
  /**
   * A One-To-Many relationship with the Activities which have been performed by an Account (foreign key - "account")
   */
  activities: GetReactionActivities_accountById_activities[];
}

export interface GetReactionActivities {
  accountById: GetReactionActivities_accountById | null;
}

export interface GetReactionActivitiesVariables {
  address: string;
  offset?: number | null;
  limit: number;
}
