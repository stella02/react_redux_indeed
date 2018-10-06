import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Login from '../../container/login/login'
import Register from '../../container/register/register'

function Msg(){
	return <h2>Msg List Page</h2>
}

@connect(
	state=>state
)
class Dashboard extends React.Component{

	render(){
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/boss',
				text:'genius',
				icon:'boss',
				title:'genius list',
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS list',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'msg',
				icon:'msg',
				title:'msg list',
				component:Msg
			},
			{
				path:'/me',
				text:'me',
				icon:'user',
				title:'self center',
				component:User
			},
			
		]
		if(pathname==='/'){
			return (
				<div>
				<Switch>
					<Route path='/register' component={Register}></Route>
					<Route component={Login}></Route>
				</Switch>
				</div>
			)
		}

		return (
			<div>
				<NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
				
			</div>
		)

		
	}

}

export default Dashboard