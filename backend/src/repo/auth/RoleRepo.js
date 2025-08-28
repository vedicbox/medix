import RoleDao from "@models/auth/RoleDao.js";

export default class RoleRepo {
  /**
   * Get all active roles for an organization
   */
  static async getAll(orgRef) {
    return RoleDao.find({ orgRef, type: 1 })
      .select('-__v')
      .lean();
  }

  /**
   * Get specific role by ID and organization
   */
  static async getById(id, orgRef) {
    return RoleDao.findOne({ _id: id, orgRef, status: 1 }).lean();
  }

  /**
   * Get only role names and IDs for dropdowns
   */
  static async getNames(orgRef) {
    return RoleDao.find({ orgRef, status: 1 })
      .select('name _id')
      .lean();
  }

  /**
   * Get admin-specific roles
   */
  static async getAdminList() {
    return RoleDao.aggregate([
      { $match: { type: 2 } },
      {
        $lookup: {
          from: 'organizations',
          localField: 'orgRef',
          foreignField: '_id',
          as: 'orgData'
        }
      },
      { $unwind: '$orgData' },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'roleRef',
          as: 'userData'
        }
      },
      { $unwind: '$userData' },
      {
        $project: {
          _id: 1,
          roleName: '$name',
          permission: '$permission',
          name: '$orgData.name',
          orgCode: '$orgData.orgCode',
          email: '$userData.email',
          fullName: {
            $concat: ['$userData.firstName', ' ', '$userData.lastName']
          },
          userStatus: '$userData.isActive',
        }
      },
    ]);
  }

  /**
   * Check if a role exists with given criteria
   */
  static async isExists(query) {
    const finalQuery = { ...query };
    return RoleDao.exists(finalQuery);
  }

  /**
   * Create a new role
   */
  static async create(roleData) {
    return RoleDao.create(roleData);
  }

  /**
   * Update a role with validation
   */
  static async update(id, updateData) {
    return RoleDao.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

}