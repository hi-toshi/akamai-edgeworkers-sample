## Description
This example enables `Secure` attribute of set-cookie which doesn't have the attribute from Origin server.

## Usage Example
    // Response from Origin Server
    set-cookie: Apache=abcdefg; path=/; expires=Thu, 23-Jun-22 02:29:48 GMT
    set-cookie: id=123; Expires=Wed, 22 Jun 2022 12:59:33 GMT; Path=/; secure; HttpOnly
    
    // Response from Edge
    set-cookie: Apache=abcdefg; Expires=Thu, 23 Jun 2022 02:31:15 GMT; Path=/; Secure
    set-cookie: id=123; Expires=Wed, 22 Jun 2022 12:59:33 GMT; Path=/; Secure; HttpOnly
