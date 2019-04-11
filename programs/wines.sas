/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
data wineList;  
 input year cabernet merlot pinot chardonnay twobit ;  
 cards;  
 2000 10 20 30 40 50   
 2001 5 10 15 5 0  
 2002 6 7 11 12 13  
 2003 5 8 0 0 50 
 2004 11 5 7 8 100  
 2005 1  1 0 0 1000  
 2006 0 0 0 0 3000  
;;;;  
run;  
    
data wine ;  
set winelist( where= (year GE &from && year LE &to));  
total = cabernet + merlot + pinot + chardonnay + twobit;  
run;  
  
ods html style=barrettsblue;  
    proc print data=wine;run;  
ods html close;run  