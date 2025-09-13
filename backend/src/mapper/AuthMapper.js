
class AuthMapper {
  /**
   * Maps profile data to a user entity for creation
   * @param {Object} profileData - User profile data
   * @param {string} orgCode - Organization code
   * @returns {Object} User entity with required fields
   */
  static toUserEntity(profileData, orgRef) {
    const { email, firstName, lastName, roleRef, clinicRef, specsRef } = profileData;

    return {
      email,
      firstName: firstName,
      lastName: lastName,
      password: email,
      roleRef,
      clinicRef,
      orgRef,
      specsRef
    };
  }

  /**
   * Maps profile data to a user entity for updates
   * @param {Object} profileData - User profile data
   * @returns {Object} Partial user entity with only provided fields
   */
  static toUserUpdateEntity(profileData) {
    const { email, firstName, lastName, roleRef, clinicRef, specsRef } = profileData;
    return {
      email,
      firstName: firstName,
      lastName: lastName,
      roleRef,
      clinicRef,
      specsRef
    };
  }

  static getAdminstratorUser(orgRef, roleRef) {
    const {
      ADMINISTRATION_EMAIL: email,
      ADMINISTRATION_PASSWORD: password,
      ADMINISTRATION_FIRSTNAME: firstName,
      ADMINISTRATION_LASTNAME: lastName
    } = process.env;

    return {
      email,
      password,
      firstName,
      lastName,
      orgRef,
      roleRef
    };
  }

}

export default AuthMapper;