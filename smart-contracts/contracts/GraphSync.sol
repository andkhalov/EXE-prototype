// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * GraphSync:
 *  - Contract that logs RDF for off-chain ingestion, bridging on-chain -> GraphDB.
 *  - In reality, you'd store minimal data or just a hash, since storing large RDF can be expensive.
 */
contract GraphSync {
    event LogRDF(string subject, string predicate, string obj);

    /**
     * recordRDF: On-chain function that emits RDF triple as event.
     * Off-chain script will parse and insert into GraphDB.
     */
    function recordRDF(string calldata subject, string calldata predicate, string calldata obj) external {
        // Possibly some access checks (only certain agents can write?)
        emit LogRDF(subject, predicate, obj);
    }
}
