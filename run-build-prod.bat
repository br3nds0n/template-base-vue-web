@REM                       ⚠️ ATENÇÃO ⚠️
@REM este arquivo irá buildar o projeto em modo de produção e gerar
@REM os arquivos estáticos na pasta dist que será usada para deploy!

@Echo Off
@Echo.
@Echo [INFO] -----------------[ build prod ]-----------------
@Echo.

npx vite build --mode prod
