import { CustomHasher } from '@nx/devkit';

/**
 * This is a boilerplate custom hasher that matches
 * the default Nx hasher. If you need to extend the behavior,
 * you can consume workspace details from the context.
 */
export const routesHasher: CustomHasher = async (task, context) => {
  return context.hasher.hashTask(task, context.taskGraph, process.env);
};

export default routesHasher;
