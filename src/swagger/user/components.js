/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         Email:
 *           type: string
 *           example: "admin@gmail.com"
 *         Name:
 *           type: string
 *           example: "MongoDB Elias Morocho Ancalle"
 *         Password:
 *           type: string
 *           example: "123"
 *         Role:
 *           type: string
 *           example: "Admin"
 *       required:
 *         - Email
 *         - Name
 *         - Password
 *         - Role
 *     CreateUserDTO:
 *       type: object
 *       properties:
 *         Email:
 *           type: string
 *         Name:
 *           type: string
 *         Password:
 *           type: string
 *         Role:
 *           type: string
 *       required:
 *         - Email
 *         - Name
 *         - Password
 *         - Role
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         Role:
 *           type: string
 *       required:
 *         - Name
 *         - Role
 */

module.exports = {
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    Email: {
                        type: 'string',
                        example: 'admin@gmail.com',
                    },
                    Name: {
                        type: 'string',
                        example: 'MongoDB Elias Morocho Ancalle',
                    },
                    Password: {
                        type: 'string',
                        example: '123',
                    },
                    Role: {
                        type: 'string',
                        example: 'Admin',
                    },
                },
                required: ['Email', 'Name', 'Password', 'Role'],
            },
            CreateUserDTO: {
                type: 'object',
                properties: {
                    Email: {
                        type: 'string',
                    },
                    Name: {
                        type: 'string',
                    },
                    Password: {
                        type: 'string',
                    },
                    Role: {
                        type: 'string',
                    },
                },
                required: ['Email', 'Name', 'Password', 'Role'],
            },
            UpdateUserDTO: {
                type: 'object',
                properties: {
                    Name: {
                        type: 'string',
                    },
                    Role: {
                        type: 'string',
                    },
                },
                required: ['Name', 'Role'],
            },
        },
    },
};
