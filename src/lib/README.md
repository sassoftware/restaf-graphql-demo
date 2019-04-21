# Utility functions

These are generic functions that use restaf to interact with SAS Viya.

1. caslBase - sets up arguments and invokes cas on the server

2. casSetup - creates cas session and loads specified actionsets

3. computeSummary - reduces output from compute service to a form easier to consume in the resolvers

4. findReport - finds a specific VA report

5. getProgram - retrieves a program from the location indicated by the PROGRAMURI environment variable.

6. getReportHref - generates the report url for a specified report

7. getReportImage - get the SVG for a specified report

8. getSASTableRows - converts the incoming table from compute service to [{col1: val, col2: val},...].

9. jsonToDict - converts json to a string containing casl dictionary.

10. logLines - converts sas log to html

11. runCompute - executes compute service

12. spBase - sets up call to compute service and executes it via runCompute.