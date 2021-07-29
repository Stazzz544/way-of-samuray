import React from 'react';
import MyPosts from './MyPosts';
import {
	addPostActionCreator,
	updateNewPostTextActionCreator
} from '../../../redux/profileReducer'
import StoreContext from '../../../StoreContext';

const MyPostsContainer = () => {

	return (
		<StoreContext.Consumer> 
			{ (store) => {
				let state = store.getState();

				let addPost = () => {
					store.dispatch(addPostActionCreator());
				}
			
				let onPostChange = (text) => {
					let action = updateNewPostTextActionCreator(text);
					store.dispatch(action);
				}

				return <MyPosts 
					updateNewPostTextActionCreator={onPostChange}
					addPost={addPost}
					posts={state.profilePage.posts}
					newPostText={state.profilePage.newPostText}/>
			}
		}
		</StoreContext.Consumer>
		)
}


export default MyPostsContainer;