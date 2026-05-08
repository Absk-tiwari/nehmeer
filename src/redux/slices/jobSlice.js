import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import jobIcons from "../../constants/jobIcons";

// Helper function to transform job data from API
const transformJobData = (item) => {
  const answers = {};
  if (item.answers && Array.isArray(item.answers)) {
    item.answers.forEach((a) => {
      answers[a.question] = a.answer;
    });
  }

  return {
    ...item,
    id: item.id?.toString() || item._id,
    title: item.role || item.title || "Worker",
    experience: answers["Experience Level"] || answers["Experience"] || item.experience || "",
    location: answers["Location"] || answers["City"] || item.location || item.city || "",
    status: item.status === "active" ? "Open" : item.status === "closed" ? "Closed" : item.status,
    statusColor: item.status === "active" ? "#738F2D" : "red",
    job_role_id: item.role_id || item.job_role_id,
    icon: jobIcons[item.role_id] || jobIcons[item.job_role_id],
  };
};

// 🔥 GET ALL JOBS (with filters, pagination, sorting)
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (
    {
      tab = "all",
      pagination = { page: 1, limit: 20 },
      filters = {},
      sortBy = "Newest First",
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/jobs", {
        tab,
        pagination,
        filters,
        sortBy,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

// 🔥 MY JOB LISTINGS
export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/jobs/my/listings");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

// 🔥 GET SINGLE JOB
export const getJobById = createAsyncThunk(
  "jobs/getJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${jobId}`);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch job details");
    }
  }
);

// 🔥 GET CUSTOM QUESTIONS
export const getCustomQuestions = createAsyncThunk(
  "jobs/getCustomQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/jobs/custom-questions");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch custom questions");
    }
  }
);

// 🔥 GET CUSTOM REQUESTS
export const getCustomRequests = createAsyncThunk(
  "jobs/getCustomRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/jobs/custom-requests");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch custom requests");
    }
  }
);

// 🔥 GET QA
export const getJobQA = createAsyncThunk(
  "jobs/getJobQA",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/jobs/qa");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch Q&A");
    }
  }
);

// 🔥 CREATE JOB
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/jobs/create", jobData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create job"
      );
    }
  }
);

// 🔥 APPLY TO JOB
export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/jobs/${jobId}/apply`, applicationData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to apply to job"
      );
    }
  }
);

// 🔥 GET JOB APPLICANTS
export const getJobApplicants = createAsyncThunk(
  "jobs/getJobApplicants",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/jobs/${jobId}/applicants`);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch applicants");
    }
  }
);

// 🔥 CREATE CUSTOM REQUEST
export const createCustomRequest = createAsyncThunk(
  "jobs/createCustomRequest",
  async (requestData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/jobs/custom-request", requestData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create custom request"
      );
    }
  }
);

// 🔥 UPDATE JOB
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/jobs/${jobId}`, jobData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update job"
      );
    }
  }
);

// 🔥 CLOSE JOB
export const closeJob = createAsyncThunk(
  "jobs/closeJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/jobs/${jobId}/close`);
      return { ...data, jobId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to close job"
      );
    }
  }
);

// 🔥 UPDATE APPLICATION STATUS
export const updateApplicationStatus = createAsyncThunk(
  "jobs/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/jobs/applications/${applicationId}/status`,
        { status }
      );
      return { ...data, applicationId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update application status"
      );
    }
  }
);

// 🔥 DELETE JOB
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/jobs/${jobId}`);
      return { ...data, jobId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    total: 0,
    selectedJob: null,
    applicants: [],
    customQuestions: [],
    customRequests: [],
    qa: [],
    loading: false,
    error: null,
    createLoading: false,
    createSuccess: false,
  },
  reducers: {
    resetJobState: (state) => {
      state.createSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ALL JOBS
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        const rawData = action.payload?.data || [];
        state.list = rawData.map(transformJobData);
        state.total = action.payload?.pagination?.total || 0;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MY JOBS
      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
        state.total = action.payload?.pagination?.total || 0;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE JOB
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload?.data || null;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CUSTOM QUESTIONS
      .addCase(getCustomQuestions.fulfilled, (state, action) => {
        state.customQuestions = action.payload?.data || [];
      })

      // CUSTOM REQUESTS
      .addCase(getCustomRequests.fulfilled, (state, action) => {
        state.customRequests = action.payload?.data || [];
      })

      // QA
      .addCase(getJobQA.fulfilled, (state, action) => {
        state.qa = action.payload?.data || [];
      })

      // CREATE JOB
      .addCase(createJob.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        if (action.payload?.data) {
          state.list.unshift(action.payload.data);
        }
      })
      .addCase(createJob.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // APPLY TO JOB
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET APPLICANTS
      .addCase(getJobApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload?.data || [];
      })

      // CREATE CUSTOM REQUEST
      .addCase(createCustomRequest.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.customRequests.unshift(action.payload.data);
        }
      })

      // UPDATE JOB
      .addCase(updateJob.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (updated) {
          const index = state.list.findIndex((j) => j.id === updated.id);
          if (index !== -1) {
            state.list[index] = updated;
          }
          state.selectedJob = updated;
        }
      })

      // CLOSE JOB
      .addCase(closeJob.fulfilled, (state, action) => {
        const jobId = action.payload.jobId;
        const job = state.list.find((j) => j.id === jobId);
        if (job) {
          job.status = "closed";
        }
      })

      // UPDATE APPLICATION STATUS
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const { applicationId } = action.payload;
        const applicant = state.applicants.find((a) => a.id === applicationId);
        if (applicant) {
          applicant.status = action.payload?.data?.status;
        }
      })

      // DELETE JOB
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.list = state.list.filter((j) => j.id !== action.payload.jobId);
      });
  },
});

export const { resetJobState } = jobSlice.actions;
export default jobSlice.reducer;
