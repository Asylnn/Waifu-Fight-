call npx tsc -p ./tsconfigClient.json
call npx tsc -p ./tsconfigServer.json
copy /y .\public\*.html .\dist\public\
copy /y .\public\css\*.css .\dist\public\css
