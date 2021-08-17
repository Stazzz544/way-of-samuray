import { connect } from 'react-redux';
import s from './Users.module.css'
import {follow, setUsers, unfollow, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../redux/usersReduser'
import React from 'react';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader'


class UsersContainer extends React.Component{
	constructor (props) {
		
		super(props);
	}
	componentDidMount() {
		this.props.toggleIsFetching (true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}}`)
		.then(response => {
			this.props.toggleIsFetching (false);
			this.props.setUsers(response.data.items);
			this.props.setTotalUsersCount(response.data.totalCount)
		});
	}
	
	onPageChanged = (pageNumber) => {
		this.props.toggleIsFetching (true);
		this.props.setCurrentPage(pageNumber);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}}`)
		.then(response => {
			this.props.toggleIsFetching (false);
			this.props.setUsers(response.data.items)

		});
	};
	render() { //метод render вернет jsx, пропс сюда не приходит
		return <>
			{ this.props.isFetching ? <Preloader 
													wripperStyle={s.globalLoaderWrapper}
													preloaderStyle={s.globalLoaderImg}
													/> : null }
			<Users totalUsersCount={this.props.totalUsersCount}
							pageSize={this.props.pageSize}
							currentPage ={this.props.currentPage}
							onPageChanged={this.onPageChanged}
							users={this.props.users}
							follow={this.props.follow}
							unfollow={this.props.unfollow}
			/>
		</>
	}
	
}

let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching
	};
}


export default connect (mapStateToProps, {
	follow,
	unfollow,
	setUsers,
	setCurrentPage,
	setTotalUsersCount,
	toggleIsFetching,
}) (UsersContainer);

