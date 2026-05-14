
  /**
   * Create a new worker with profile
   * POST /api/profile
   */
  
  /**
   * Update worker with profile
   * PUT /api/workers/:id
   */
  const updateWorker = async (req, res) => {
    const trx = await User.startTransaction();

    try {
      const { id } = req.params;
      const {
        name,
        phone,
        email,
        whatsapp,
        gender,
        is_active,
        title,
        age,
        education,
        language,
        religion,
        marital_status,
        description,
        experience,
        hourly_rate,
        monthly_rate,
        is_part_time_available,
        is_full_time_available,
        is_available,
        city,
        location
      } = req.body;

      const user = await User.query(trx).findById(id);
      if (!user) {
        await trx.rollback();
        return res.status(404).json({ message: 'Worker not found' });
      }

      // Update user
      await User.query(trx).findById(id).patch({
        name,
        phone,
        email: email || null,
        whatsapp: whatsapp || null,
        gender: gender || 'male',
        is_active: is_active ? 1 : 0
      });

      // Update or create worker profile
      const existingProfile = await WorkerProfile.query(trx).findOne({ user_id: id });

      const profileData = {
        title: title || null,
        age: age || null,
        education: education || null,
        language: language || null,
        religion: religion || null,
        marital_status: marital_status || null,
        description: description || null,
        experience: experience || null,
        hourly_rate: hourly_rate || null,
        monthly_rate: monthly_rate || null,
        is_part_time_available: is_part_time_available ? 1 : 0,
        is_full_time_available: is_full_time_available ? 1 : 0,
        is_available: is_available ? 1 : 0,
        city: city || null,
        location: location || null
      };

      if (existingProfile) {
        await WorkerProfile.query(trx).findById(existingProfile.id).patch(profileData);
      } else {
        await WorkerProfile.query(trx).insert({
          user_id: id,
          ...profileData,
          verification_status: 'pending'
        });
      }

      await trx.commit();

      const worker = await User.query()
        .findById(id)
        .withGraphFetched('workerProfile');

      return res.status(200).json({
        message: 'Worker updated successfully',
        data: worker
      });

    } catch (error) {
      await trx.rollback();
      console.error('Update worker error:', error);
      return res.status(500).json({ message: 'Failed to update worker' });
    }
  };