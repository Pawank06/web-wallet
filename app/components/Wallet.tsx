'use client'

import React, { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Button } from '@/components/ui/button';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { HDNodeWallet } from 'ethers';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, Eye, EyeOff } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const blockchain = [
    {
        value: "solana",
        label: "Solana",
    },
    {
        value: "ethereum",
        label: "Ethereum",
    },
];

const WalletComp = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [showMnemonic, setShowMnemonic] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [wallets, setWallets] = useState<{ blockchain: string; publicKey: string; }[]>([]);

    const generateMnenonics = () => {
        const mnemonic = generateMnemonic();
        setMnemonic(mnemonic);
        setShowMnemonic(false); // Hide mnemonic by default after generating it
    };

    const deriveEthereumAddress = (seed: Buffer, index: number) => {
        const hdNode = HDNodeWallet.fromSeed(seed);
        const derivedNode = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);
        return derivedNode.address;
    };

    const addWallet = () => {
        const seed = mnemonicToSeedSync(mnemonic);

        let publicKey = '';
        if (value === "solana") {
            const path = `m/44'/501'/${wallets.length}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        } else if (value === "ethereum") {
            publicKey = deriveEthereumAddress(seed, wallets.length);
        }
        setWallets([...wallets, { blockchain: value, publicKey }]);
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='grid gap-6'>


                <div className='grid gap-4'>
                    {
                        mnemonic && (
                            <h1 className='text-3xl font-bold'>Generated Mnemonic</h1>
                        )
                    }
                    {mnemonic && (
                        <div className='flex items-center gap-2'>
                            <input
                                type={showMnemonic ? "text" : "password"}
                                value={mnemonic}
                                readOnly
                                className='border p-2 w-full'
                            />
                            <Button
                                variant="outline"
                                onClick={() => setShowMnemonic(!showMnemonic)}
                            >
                                {showMnemonic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    )}
                    <Button onClick={generateMnenonics}>
                        {
                            mnemonic ? (<span>Generate new Mnemonic</span>) : <span> Generate Mnemonic</span>
                        }

                    </Button>

                </div>

                {
                    mnemonic && (
                        <div className='grid gap-3 mt-10'>
                            <h1 className='text-4xl font-bold'>Select your blockchain</h1>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="justify-between"
                                    >
                                        {value
                                            ? blockchain.find((blockchain) => blockchain.value === value)?.label
                                            : "Select blockchain"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search blockchain..." />
                                        <CommandList>
                                            <CommandEmpty>No blockchain found.</CommandEmpty>
                                            <CommandGroup>
                                                {blockchain.map((blockchain) => (
                                                    <CommandItem
                                                        key={blockchain.value}
                                                        value={blockchain.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value === blockchain.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {blockchain.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                }

                {mnemonic && (
                    <Button
                        onClick={addWallet}
                        disabled={!value} // Disable the button if no blockchain is selected
                    >
                        Add Wallet
                    </Button>
                )}




                {wallets.length > 0 && (
                    <div className='grid gap-4 mt-4'>
                        <h2 className='text-2xl font-bold'>Your Wallets</h2>
                        <ul>
                            {wallets.map((wallet, index) => (
                                <li key={index} className="p-4 bg-gray-100 rounded">
                                    <strong>{wallet.blockchain} wallet :</strong> {wallet.publicKey}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default WalletComp;
