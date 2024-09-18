
class DeletedUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        }
        const deletedUser = await this.userRepository.deleted(userId);
        return deletedUser;
    }
}

module.exports = DeletedUser;
