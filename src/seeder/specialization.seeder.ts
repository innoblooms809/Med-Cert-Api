import Profile from "../models/Profile.model";
import Specialization from "../models/Specialization.model";

export const seedSpecializations = async () => {
  const data = [
     // DOCTOR
    { name: "Medical", profile: "Doctor" },
    { name: "Surgical", profile: "Doctor" },
    { name: "Diagnostics", profile: "Doctor" },
    { name: "Women & Child", profile: "Doctor" },

    // NURSE
    { name: "General Nursing", profile: "Nurse" },
    { name: "Critical Care", profile: "Nurse" },
    { name: "Emergency Nursing", profile: "Nurse" },

    // TECHNICIAN
    { name: "Laboratory", profile: "Technician" },
    { name: "Radiology", profile: "Technician" },
    { name: "Operation Theatre", profile: "Technician" },
  ];

  for (const item of data) {
    const profile = await Profile.findOne({ where: { name: item.profile } });
      if (!profile) {
      console.error(`Profile not found: ${item.profile}`);
      continue;
    }

    await Specialization.findOrCreate({
      where: {
        name: item.name,
        profileId: profile.id,
      },
      defaults: {
        name: item.name,
        profileId: profile.id,
      },
    });

    console.log(`Specialization added: ${item.name}`);
  }
    
    console.log("Specializations seeded");

};
