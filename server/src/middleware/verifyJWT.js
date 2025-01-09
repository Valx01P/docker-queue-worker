// todos:
// add middleware logic for verifying JWT access tokens
// don't bother with cookies for now, the refresh route will
// be responsible for new access tokens with the refresh httpOnly cookie
// this will also decode the jwt and add the user id to the req object