
class AuthMapper {
  /**
   * Maps profile data to a user entity for creation
   * @param {Object} profileData - User profile data
   * @param {string} orgCode - Organization code
   * @returns {Object} User entity with required fields
   */
  static toUserEntity(profileData, orgCode) {
    const { email, firstName, lastName, roleRef } = profileData;

    return {
      email,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      password: email,
      roleRef,
      orgCode,
    };
  }

  /**
   * Maps profile data to a user entity for updates
   * @param {Object} profileData - User profile data
   * @returns {Object} Partial user entity with only provided fields
   */
  static toUserUpdateEntity(profileData) {
    const { email, firstName, lastName, roleRef } = profileData;

    return {
      email,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      roleRef
    };
  }
}

export default AuthMapper;