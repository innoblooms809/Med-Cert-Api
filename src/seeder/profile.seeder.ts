import Profile from "../models/Profile.model";

export const seedProfiles = async () => {
  const profiles = ["Doctor", "Nurse", "Technician"];
  for (const name of profiles) {
    try {
      await Profile.findOrCreate({ where: { name } });
    } catch (e) {
      console.error("Seeding profile failed for:", name, e);
    }
  }
  console.log('seedProfile!...')
};
