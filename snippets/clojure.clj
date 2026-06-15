(ns naas-example
  (:require [clj-http.client :as client]))

(defn -main []
  (let [response (client/get "https://no.krajtilak.in/api/no")]
    (println "Response:" (:body response))))