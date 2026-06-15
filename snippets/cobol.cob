       IDENTIFICATION DIVISION.
       PROGRAM-ID. NAAS-GET.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-URL      PIC X(120) VALUE "https://no.krajtilak.in/api/no".
       01  WS-CMD      PIC X(150).
       PROCEDURE DIVISION.
           STRING "curl -s " DELIMITED BY SIZE
                  WS-URL DELIMITED BY SPACE
                  INTO WS-CMD
           CALL "SYSTEM" USING WS-CMD.
           STOP RUN.