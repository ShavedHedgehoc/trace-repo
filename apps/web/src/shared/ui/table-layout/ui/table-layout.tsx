import { SkeletonTable } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { motion, AnimatePresence } from 'framer-motion';
import { DataTable } from './data-table';
import type { PaginationParams, TDataTableProps } from '../model';

export function TableLayout<TData, T extends PaginationParams>(props: TDataTableProps<TData, T>) {
  const isLoadingInitial = !props.data;
  const isPending = props.isFetching;
  return (
    <div
      className={cn(
        'w-full mx-auto transition-all duration-500 relative ',
        props.className,
        isPending && 'opacity-60 grayscale-50 pointer-events-none',
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoadingInitial ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SkeletonTable rows={props.params?.limit ?? 10} columns={props.columns.length} />
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn(isPending && 'pointer-events-none')}>
              <DataTable
                columns={props.columns}
                data={props.data!}
                getRowClassName={props.getRowClassName}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
