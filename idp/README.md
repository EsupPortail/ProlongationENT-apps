# Application SaaS shibbolethisée

Voici une astuce permettant d'ajouter la ProlongationENT sur une application SaaS shibbolethisée.

NB : solution testée : idp shibboleth CAS-ifié avec frontaux apache 2.4

Il vous faudra :
- créer un reverse proxy pour l'application SaaS
- créer un reverse proxy pour votre idp
- modifier un peu votre apache pour CAS

## Reverse proxy pour votre idp

Nous suggérons de créer un vhost ```idp-proxy``` plutôt que de modifier directement votre idp.
Cela n'est pas strictement nécessaire mais cela permettra soit à l'application machin.com ou machin.univ.fr .
Si vous modifiez directement votre idp, un utilisateur de votre établissement accédant à machin.com arrivera sur machin.univ.fr .

```apache
# s'assurer que les redirects internes à l'idp shibboleth restent sur idp-proxy :
Header edit Location ^https://idp.univ.fr https://idp-proxy.univ.fr
# demander a CAS de revenir sur idp-proxy plutot que idp (necessite une modification dans CAS) :
Header edit Location "^(\Qhttps://cas.univ.fr/\E.*)" "$1\&redirect_uri=https://idp-proxy.univ.fr/idp/Authn/RemoteUser"
# propager le logout idp-proxy au vrai idp :
Header edit Location "^(/idp/profile/SAML2/Redirect/SLO\?.*)" https://idp.univ.fr/idp/profile/Logout

# modifier l'url dans le form (SAML HTTP POST binding)
RequestHeader unset  Accept-Encoding
AddOutputFilterByType SUBSTITUTE text/html
Substitute "s|machin.com|machin.univ.fr|"
# ajouter les autres applications SaaS ici
```

## Gestion des ```redirect_uri``` dans CAS

Contrairement au protocole OpenID Connect, le protocole CAS ne permet pas d'avoir plusieurs URLs autorisées pour le même service.
Il est assez simple d'ajouter cette fonctionnalité dans le apache de CAS.
Par exemple, autorisons idp-proxy.univ.fr à utiliser le service idp.univ.fr :

```apache
Header edit Location \
       "^\Qhttps://idp.univ.fr/idp/Authn/RemoteUser\E" \
       "https://idp-proxy.univ.fr/idp/Authn/RemoteUser" \
       "expr=%{QUERY_STRING} =~ m!\Q&redirect_uri=https://idp-proxy.univ.fr/idp/Authn/RemoteUser\E$!"       
```

Lorsque l'application redirige vers votre idp, renvoyez la vers un proxy de votre idp :

```apache
Header edit Location idp.univ.fr idp-proxy.univ.fr
```

## Reverse proxy pour l'application 

Lorsque l'application redirige vers votre idp, renvoyez la vers idp-proxy :

```apache
Header edit Location idp.univ.fr idp-proxy.univ.fr
```
