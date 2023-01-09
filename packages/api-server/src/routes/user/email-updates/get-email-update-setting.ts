import {FastifyPluginAsyncJsonSchemaToTs} from "@fastify/type-provider-json-schema-to-ts/index";
import { Auth0User, parseAuth0User } from "../../../plugins/services/user-service/auth0";

const schema = {
    description: 'Get email updates setting',
    tags: ['user'],
    response: {
        200: {
            type: 'object',
            description: 'OK',
            properties: {
                emailGetUpdates: {
                    type: 'boolean',
                }
            }
        }
    }
}

const root: FastifyPluginAsyncJsonSchemaToTs = async (app, opts): Promise<void> => {
    app.get('/', {
        // @ts-ignore
        preValidation: app.authenticate,
        schema
    }, async function (req, reply) {
        const { sub } = parseAuth0User(req.user as Auth0User);
        const userId = await app.userService.findOrCreateUserByAccount(sub, req.headers.authorization);
        const res = await app.userService.getEmailUpdates(userId);
        reply.send(res);
    });
}

export default root;
