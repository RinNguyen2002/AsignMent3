import { Button, Input } from 'antd'
import React from 'react'
import './style.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { actfetchAllTask, setNewPage, setSearchKey } from '../../redux/features/tasks/taskSlice'
import { TASK_STATUS } from '../../constants/task.Constant'
const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchKey = useSelector(state => state.task.searchKey);
    const pagination = useSelector(state => state.task.pagination);
    const location = useLocation()
    console.log(location);
    const handleRedirectAddTask = () => {
        navigate(ROUTES.ADD_NEW);
    }

    const computerCurrentStatusSearch = (pathName) =>{
       switch(pathName) {
        case "/all-task": return ""
        case "/new-task": return TASK_STATUS.NEW
        case "/doing-task": return TASK_STATUS.DOING
        case "/done-task": return TASK_STATUS.DONE
        
        default: return ""
       }
    }

    const handleSearchTask = (event) =>{
        event.preventDefault()

        const statusSearch = computerCurrentStatusSearch(location.pathname)
        dispatch(actfetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey,
            ...(!!statusSearch ? {status: statusSearch}: {} )
        }))
        dispatch(setNewPage(1))
        
    }

    const handleChangeInputSearch = (event) =>{
        
        const value = event.target.value;
        dispatch(setSearchKey(value))
    }
    return (
        <div className='header-container'>
            <Button onClick={handleRedirectAddTask} className='button-header'>Create New Task</Button>
            <form className='header-container__search-area' onSubmit={handleSearchTask}>
                {/* <Input className='input__search' /> */}
                <div className="input__container">
                    <div className="shadow__input"></div>

                    <Input 
                    type="text" name="text" className="input__search" 
                    placeholder="What do you want to search?" 
                    value={searchKey} 
                    onChange={handleChangeInputSearch} />
                </div>
                <Button type='submit' onClick={handleSearchTask} ><span className='box'>Search</span></Button>
            </form>
        </div>
    )
}

export default HeaderComponent