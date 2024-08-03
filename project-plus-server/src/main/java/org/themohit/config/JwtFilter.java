package org.themohit.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Configuration
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt=request.getHeader(ConfigConstants.JWT_HEADER);
        if(jwt!=null){
            jwt=jwt.substring(7);
            try{
                Claims claims = getClaims(jwt);
                String email=String.valueOf(claims.get("email"));
                String authorities=String.valueOf((claims.get("authorities")));
                List<GrantedAuthority> auths= AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication=new UsernamePasswordAuthenticationToken(email,null,auths);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }catch (Exception ex){
                throw new BadCredentialsException("Wrong JSON Web token");
            }
        }
        filterChain.doFilter(request,response);
    }

    public static Claims getClaims(String jwt) {
        SecretKey key= ConfigConstants.JWT_SECRET_KEY;
//        Claims claimsOld= Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getPayload();
//        System.out.println("ClaimsOld:::"+claimsOld);
        Claims claims= Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
        System.out.println("Claims:::"+claims);
        return claims;
    }
}
