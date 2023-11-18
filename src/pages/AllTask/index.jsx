import React, { useEffect } from 'react'
import MainContentTask from '../../components/MainContentTask'
import { useDispatch, useSelector } from 'react-redux'
import { actfetchAllTask, setNewPage } from '../../redux/features/tasks/taskSlice';
import { Pagination, Spin } from 'antd';

const AllTask = () => {
  const dispatch = useDispatch();
  const {isLoading, tasks, pagination, searchKey} = useSelector(state =>state.task)

  useEffect(() => {

    dispatch(actfetchAllTask({
      _page: 1,
      _limit: pagination.limitPerPage,
      q: searchKey,
    }))
    
    return () => {
      dispatch(setNewPage(1));
    }
    // eslint-disable-next-line
  }, [])

  console.log(tasks, "all tasks ne");

  const handleChangePage = (newPage) =>{
    
    dispatch(setNewPage(newPage));
    dispatch(actfetchAllTask({
      _page: newPage,
      _limit: pagination.limitPerPage,
      q: searchKey,
    }))
  }
  if(isLoading){
    return <Spin/>
  }
  
  return (
    <div>
        {
          tasks.length === 0 ? <div>No Task</div>:<>
          <MainContentTask tasks={tasks}/>
          <Pagination 
          defaultPageSize={pagination.limitPerPage} 
          current={pagination.currentPage} 
          onChange={handleChangePage} 
          total={pagination.total}
          />
          
          </>
        }
       
    </div>
  )
}

export default AllTask