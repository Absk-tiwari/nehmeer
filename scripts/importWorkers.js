const xlsx = require('xlsx');
const User = require('../models/User');
const WorkerProfile = require('../models/WorkerProfile');

const userFields = [
  'name', 'phone', 'email', 'role', 'whatsapp', 'gender',
  'is_verified', 'is_phone_verified', 'is_active', 'profile_photo', 'lookingFor'
];

const workerProfileFields = [
  'age', 'education', 'language', 'religion', 'marital_status', 'description',
  'experience', 'skills', 'part_time_salary', 'full_time_salary',
  'is_part_time_available', 'is_full_time_available', 'hourly_rate', 'monthly_rate',
  'is_available', 'latitude', 'longitude', 'city', 'service_radius_km',
  'verification_status', 'location', 'title'
];

const importWorkers = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

  const stats = { total: rows.length, inserted: 0, skipped: 0, errors: [] };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2;

    try {
      // Extract user data
      const userData = {};
      userFields.forEach(field => {
        if (row[field] !== undefined) userData[field] = row[field];
      });

      // Defaults
      userData.role = userData.role || 'worker';
      userData.is_verified = userData.is_verified ?? 0;
      userData.is_phone_verified = userData.is_phone_verified ?? 0;
      userData.is_active = userData.is_active ?? 1;
      userData.lookingFor = userData.lookingFor ?? 0;

      if (!userData.phone) {
        throw new Error('Phone is required');
      }

      // Check duplicate
      const existing = await User.query()
        .where('phone', userData.phone)
        .orWhere('email', userData.email)
        .first();

      if (existing) {
        stats.skipped++;
        continue;
      }

      // Insert user
      const user = await User.query().insert(userData);

      // Extract and insert worker profile
      if (userData.role === 'worker') {
        const profileData = { user_id: user.id };
        workerProfileFields.forEach(field => {
          if (row[field] !== undefined) profileData[field] = row[field];
        });

        profileData.is_part_time_available = profileData.is_part_time_available ?? 0;
        profileData.is_full_time_available = profileData.is_full_time_available ?? 0;
        profileData.is_available = profileData.is_available ?? 1;
        profileData.verification_status = profileData.verification_status || 'pending';

        await WorkerProfile.query().insert(profileData);
      }

      stats.inserted++;
    } catch (error) {
      stats.errors.push({ row: rowNum, phone: row.phone, error: error.message });
    }
  }

  return stats;
};

module.exports = { importWorkers };
