import { createReducer, on } from '@ngrx/store';
import { ITaskFacetUserValues } from '../../datatypes';
import * as taskFiltersActions from './actions';

const initial: ITaskFacetUserValues = {
    filters: []
};

export const taskFiltersReducer = createReducer(
    initial,
    on(taskFiltersActions.initTaskFiltersAction, (state, { payload }) => ({...payload})),
    on(taskFiltersActions.toggleTaskFiltersAction, (state, { id, checked}) => (
        {
            ...state,
            filters:
                state.filters.map(filter => {
                    if (filter.filterId === id) {
                        return { ...filter, checked };
                    }
                    return filter;
                })
        }
    ))
);
