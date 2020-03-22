import { createStore,combineReducers, applyMiddleware } from 'redux';
import { Dishes} from './dishes';
import { Comments } from './comments';
import { Leaders } from './leader';
import { Promotions } from './promotion';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { createForms } from 'react-redux-form';
 
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
              dishes : Dishes,
              comments : Comments,
              leaders : Leaders,
            promotions :  Promotions,
            ...createForms({
                feedback: InitialFeedback
            })


        }),
        applyMiddleware(thunk, logger)

        
    );

    return store;
}