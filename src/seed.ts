import "./config/sequelize";
import { seedProfiles } from "./seeder/profile.seeder";
import { seedSpecializations } from "./seeder/specialization.seeder";
import { seedSubSpecializations } from "./seeder/subSpecialization.seeder";

(async () => {
  await seedProfiles();
  await seedSpecializations();
  await seedSubSpecializations();
  console.log("✅ All seeders executed successfully");
  process.exit(0);
})();
