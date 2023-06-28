# ACD Ladders
The website hosts those problems which have statistically been proven to help users increase their rating. In order to produce these problems the data of more than 45k active users (codeforces) was analysed. In order to know more about the script, feel free to check the code at https://github.com/i-pranav/scripts-for-ladders

The website is live at https://ACodeDaily.com

The website was forked but then had significant changes both in terms of backend and frontend, The frontend speaks for itself. On the backend, we have shifted from the Mongodb architecture to a complete json approach as the same set of calls were being made to Mongodb. It didn't make any sense to query the DB for the same queries. 
Out of the available options i.e., caching, storing everything locally. we decided to store everything locally due to multiple reasons, which is out of the scope of this discussion. 

# How to build?
There are 2 components backend and frontend. The frontend won't be able to populate the problems without support from backend. hence please deploy the backend first using npm. After that, deploy the frontend. 
Thanks! 
