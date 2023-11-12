import React, { useState } from 'react';
import * as snarkjs from 'snarkjs';

function CircuitInputForm() {
    const [leaf, setLeaf] = useState('');
    const [root, setRoot] = useState('');
    const [pathIndices, setPathIndices] = useState('');
    const [proof, setProof] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const inputs = {
            leaf,
            root,
            pathIndices: pathIndices.split(',').map(x => parseInt(x.trim(), 10))
        };

      
        try {
            const { proof } = await snarkjs.groth16.fullProve(inputs, 'wasm file', 'zkey');
            setProof(proof);
        } catch (error) {
            console.error('error', error);
        }
    };
// need to get signature here
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Leaf:
                    <input type="text" value={leaf} onChange={e => setLeaf(e.target.value)} />
                </label>
                <br />
                <label>
                    Root:
                    <input type="text" value={root} onChange={e => setRoot(e.target.value)} />
                </label>   
                <button type="submit">Proof Oluştur</button>
            </form>
            {proof && <div>Proof: {JSON.stringify(proof)}</div>}
        </div>
    );
}

export default CircuitInputForm;
