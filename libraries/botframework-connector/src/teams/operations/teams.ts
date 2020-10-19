/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
// This code has been manually edited to reflect the integration of the Teams schemas into botframework-schema
// and the botframework-connector libraries.

import * as msRest from '@azure/ms-rest-js';
import * as Models from '../models';
import * as Mappers from '../models/teamsMappers';
import * as Parameters from '../models/parameters';
import { TeamsConnectorClientContext } from '../';
import { ConversationList, TeamDetails } from 'botframework-schema';

/** Class representing a Teams. */
export class Teams {
    private readonly client: TeamsConnectorClientContext;

    /**
     * Create a Teams.
     * @param {TeamsConnectorClientContext} client Reference to the service client.
     */
    constructor(client: TeamsConnectorClientContext) {
        this.client = client;
    }

  /**
   * Fetches channel list for a given team.
   * @param teamId Team Id.
   * @param options Optional. The options object to be used in every request.
   * @returns A `Promise<Models.TeamsFetchChannelListResponse>`.
   */
    fetchChannelList(
        teamId: string,
        options?: msRest.RequestOptionsBase
    ): Promise<Models.TeamsFetchChannelListResponse>;
  /**
   * Fetches channel list for a given team.
   * @param teamId Team Id.
   * @param callback The callback.
   */
    fetchChannelList(teamId: string, callback: msRest.ServiceCallback<ConversationList>): void;
  /**
   * Fetches channel list for a given team.
   * @param teamId Team Id.
   * @param options The options object to be used in every request.
   * @param callback The callback.
   */
    fetchChannelList(
        teamId: string,
        options: msRest.RequestOptionsBase,
        callback: msRest.ServiceCallback<ConversationList>
    ): void;
   /**
   * Fetches channel list for a given team.
   * @param teamId Team Id.
   * @param options Optional. The options object to be used in every request.
   * @param callback The callback.
   * @returns A `Promise<Models.TeamsFetchChannelListResponse>`.
   */
    fetchChannelList(
        teamId: string,
        options?: msRest.RequestOptionsBase | msRest.ServiceCallback<ConversationList>,
        callback?: msRest.ServiceCallback<ConversationList>
    ): Promise<Models.TeamsFetchChannelListResponse> {
        return this.client.sendOperationRequest(
            {
                teamId,
                options,
            },
            fetchChannelListOperationSpec,
            callback
        ) as Promise<Models.TeamsFetchChannelListResponse>;
    }

  /**
   * Fetches details related to a team.
   * @param teamId Team Id.
   * @param options Optional. The options object to be used in every request.
   * @returns A `Promise<Models.TeamsFetchTeamDetailsResponse>`.
   */
    fetchTeamDetails(
        teamId: string,
        options?: msRest.RequestOptionsBase
    ): Promise<Models.TeamsFetchTeamDetailsResponse>;
  /**
   * Fetches details related to a team.
   * @param teamId Team Id.
   * @param callback The callback.
   */
    fetchTeamDetails(teamId: string, callback: msRest.ServiceCallback<TeamDetails>): void;
  /**
   * Fetches details related to a team.
   * @param teamId Team Id.
   * @param options The options object to be used in every request.
   * @param callback The callback.
   */
    fetchTeamDetails(
        teamId: string,
        options: msRest.RequestOptionsBase,
        callback: msRest.ServiceCallback<TeamDetails>
    ): void;
   /**
   * Fetches details related to a team.
   * @param teamId Team Id.
   * @param options Optional. The options object to be used in every request.
   * @param callback The callback.
   * @returns A `Promise<Models.TeamsFetchTeamDetailsResponse>`.
   */
    fetchTeamDetails(
        teamId: string,
        options?: msRest.RequestOptionsBase | msRest.ServiceCallback<TeamDetails>,
        callback?: msRest.ServiceCallback<TeamDetails>
    ): Promise<Models.TeamsFetchTeamDetailsResponse> {
        return this.client.sendOperationRequest(
            {
                teamId,
                options,
            },
            fetchTeamDetailsOperationSpec,
            callback
        ) as Promise<Models.TeamsFetchTeamDetailsResponse>;
    }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const fetchChannelListOperationSpec: msRest.OperationSpec = {
    httpMethod: 'GET',
    path: 'v3/teams/{teamId}/conversations',
    urlParameters: [Parameters.teamId],
    responses: {
        200: {
            bodyMapper: Mappers.ConversationList,
        },
        default: {},
    },
    serializer,
};

const fetchTeamDetailsOperationSpec: msRest.OperationSpec = {
    httpMethod: 'GET',
    path: 'v3/teams/{teamId}',
    urlParameters: [Parameters.teamId],
    responses: {
        200: {
            bodyMapper: Mappers.TeamDetails,
        },
        default: {},
    },
    serializer,
};
