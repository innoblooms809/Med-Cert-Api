import Specialization from "../models/Specialization.model";
import SubSpecialization from "../models/SubSpecialization.model";

export const seedSubSpecializations = async () => {
  const data = [
    // DOCTOR
    { name: "Cardiology", specialization: "Medical" },
    { name: "Neurology", specialization: "Medical" },
    { name: "Orthopedics", specialization: "Surgical" },
    { name: "Gynecology", specialization: "Women & Child" },
    { name: "Pediatrics", specialization: "Women & Child" },

    // NURSE
    { name: "ICU Nurse", specialization: "Critical Care" },
    { name: "Emergency Nurse", specialization: "Emergency Nursing" },
    { name: "Dialysis Nurse", specialization: "General Nursing" },

    // TECHNICIAN
    { name: "X-Ray Technician", specialization: "Radiology" },
    { name: "MRI Technician", specialization: "Radiology" },
    { name: "Lab Technician", specialization: "Laboratory" },
    { name: "OT Technician", specialization: "Operation Theatre" },
  ];

  for (const item of data) {
        console.log("Looking for specialization:", item.specialization);
    const specialization = await Specialization.findOne({
      where: { name: item.specialization },
    });
        console.log("Looking for specialization:", item.specialization);

 if (!specialization) {
      console.error(`Specialization NOT FOUND: ${item.specialization}`);
      continue; // prevent crash
    }
    
      await SubSpecialization.findOrCreate({
        where: {
          name: item.name,
          specializationId: specialization.id,
        },
      });
          console.log(`SubSpecialization added: ${item.name}`);

  }

  console.log("Sub-specializations seeded");
};
