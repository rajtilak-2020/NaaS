-- Requires http-conduit
{-# LANGUAGE OverloadedStrings #-}
import Network.HTTP.Simple
import qualified Data.ByteString.Lazy.Char8 as L8

main :: IO ()
main = do
    response <- httpLBS "GET https://no.krajtilak.in/api/no"
    L8.putStrLn $ getResponseBody response