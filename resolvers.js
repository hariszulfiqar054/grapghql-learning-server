import {
  getJob,
  getJobs,
  getJobsByCompany,
  createJob,
  deleteJob,
} from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: async (_, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw new GraphQLError(`Job with ID : ${id} not found`, {
          extensions: { status: 'NOT_FOUND' },
        });
      }
      return job;
    },
    company: (_, { id }) => getCompany(id),
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }) => {
      const companyId = 'FjcJCHJALA4i';
      return await createJob({ companyId, title, description });
    },
    deleteJob: async (_, { id }) => {
      const job = await deleteJob(id);
      return job;
    },
  },

  Job: {
    date: (job) => job.createdAt,
    company: (job) => getCompany(job.companyId),
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};
