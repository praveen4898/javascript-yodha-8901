import React, { useEffect, useState } from 'react'
import { Box,Heading,Flex } from '@chakra-ui/react'
import { SideDrawer } from '../Components/AdminSide/SideDrawer'
import  axios  from 'axios';
import { AdminTable } from '../Components/AdminSide/AdminTable';

import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { fetchDestinationData } from '../Redux/action';
import Users from '../Components/AdminSide/Users';



 const Admin = () => {
        const [data,setData]=useState([]);
        const [users,setUsers]=useState([]);

        const dispatch = useDispatch();
        const { isloading, iserror, destination } = useSelector((state) => state);
       
        useEffect(() => {
          dispatch(fetchDestinationData());
        }, [dispatch]);
        useEffect(() => {
          setData(destination);
        }, [destination]);
        // console.log("dispatch data ",isloading,destination)
      


    useEffect(()=>{
        async function fetchData(){
            try {
                let res= await axios.get("https://mockserver-3.onrender.com/users");
                // console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    console.log(users);
  return (
    <Box>
        

        <Flex bgColor={'whitesmoke'} p={'4'} justifyContent={'space-evenly'}> 
        <SideDrawer/>
        <Heading >Admin Dashboard</Heading>
        </Flex>
       
       
<Tabs isFitted variant='soft-rounded' colorScheme='blue' >
  <TabList>
    <Tab>Locations</Tab>
    <Tab>Users</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels  >
    <TabPanel>
   {data.length<=0?"loading......." : <AdminTable props={data}/>}
    </TabPanel>
    <TabPanel>
        <Users props={users} />
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
        

    </Box>
  )
}

export default Admin;