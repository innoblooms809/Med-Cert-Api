import Role from "../models/Role.model";

export const seedRoles = async () => {
  const roles = ["SUPER_ADMIN", "TENTATIVE_ADMIN", "INSTRUCTOR","USER"];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { role },
      defaults: { role },
      
    });
  }

  console.log("Roles seeded successfully");
};
