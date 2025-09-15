package com.authify.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    private Key getSigningKey() {
        // Use HMAC SHA key from the secret string
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String email) {
        long nowMillis = System.currentTimeMillis();
        long expirationMillis = nowMillis + 1000 * 60 * 60 * 10; // 10 hours

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(expirationMillis))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public<T> T extractClaim(String token, Function<Claims,T> claimsResolver)
    {
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractEmail(String token)
    {
       return extractClaim(token,Claims::getSubject);
    }

    public Date extractExpiration(String token)
    {
        return  extractClaim(token,Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token)
    {
       return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token,UserDetails userDetails)
    {
       final String email=extractEmail(token);
       return (email.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }









}