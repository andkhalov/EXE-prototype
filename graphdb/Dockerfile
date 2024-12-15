FROM ontotext/graphdb:10.8.4

# Copying files into the container
COPY /graphdb/repo-config.ttl /repo-config.ttl
COPY /ontology/exe.owl /ontology/exe.owl
COPY /graphdb/setup-graphdb.sh /setup-graphdb.sh
RUN chmod +x /setup-graphdb.sh


# We want to run the original GraphDB entrypoint, then our script
# One approach is to override with a small shell script that launches GraphDB in the background, then runs setup
COPY /graphdb/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["-Dgraphdb.home=/opt/graphdb/home", "-Dgraphdb.distribution=docker"]