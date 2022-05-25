import {createAsyncThunk} from '@reduxjs/toolkit';
import {loadGuitars, loadCurrentGuitar, loadComments} from './guitars-data/guitars-data';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';
import {CommentPost} from '../types/comment-post';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {handleError} from '../service/handle-error';

const GUITARS_FETCH_OPTION = '?_limit=27';

const fetchGuitarsAction = createAsyncThunk<void, undefined,{
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}${GUITARS_FETCH_OPTION}`);
      dispatch(loadGuitars(data));
    } catch (error) {
      handleError(error);
    }
  },
);

const fetchCurrentGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentGuitar',
  async (id: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
      dispatch(loadCurrentGuitar(data));
    } catch (error) {
      handleError(error);
    }
  },
);

const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
      dispatch(loadComments(data));
    } catch (error) {
      handleError(error);
    }
  },
);

const postCommentAction = createAsyncThunk<void,
  {
    guitarId: number,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/postComment',
    async ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentPost, {dispatch, extra: api}) => {
      try {
        await api.post(APIRoute.Comments, {
          guitarId: guitarId,
          userName: userName,
          advantage: advantage,
          disadvantage: disadvantage,
          comment: comment,
          rating: Number(rating),
        });
      } catch (error) {
        handleError(error);
      }
    },
  );

export {fetchGuitarsAction, fetchCurrentGuitarAction, fetchCommentsAction, postCommentAction};
