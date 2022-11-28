import { defineStore } from 'pinia';
import UserWalletDto from '../models/UserWalletDto';
import WalletDto from "../models/WalletDto"
import axios from '../axios'
import UserDto from '../models/UserDto';

export type WalletsState= {
    userWallets : UserWalletDto[],
    associations: Map<WalletDto,UserWalletDto[]>
}

export const useWalletsStore = defineStore('wallets',{
    state: ()=>({
        userWallets: [],
        associations: new Map()
    } as WalletsState),
    getters :{
        wallets(state){
            return state.userWallets?.map(uw => uw.walletDto);
        },
        wallet(state) {
            return (id: number)=> state.userWallets?.map(uw => uw.walletDto)?.filter(w => w!.id === id)! as WalletDto;
        }
    },
    actions: {
        async loadUserWallet(force: boolean){
            if(force || this.userWallets.length == 0){
                try{
                    let response = await axios.get<Array<UserWalletDto>>("api/wallet/")
                    this.userWallets = response?.data ?? [];
                }
                catch(err){
                    throw err;//TODO
                }
            }
        },
        async save(wallet: WalletDto){
            await axios.post("api/wallet/",{

            });
            await this.loadUserWallet(true);
        },
        async delete(wallet: WalletDto){
            await axios.delete(`/api/wallet/${wallet.id}`);
            await this.loadUserWallet(true);
        },
        async associate(wallet: WalletDto,user: UserDto,read: boolean,write: boolean,owner: boolean){
            await axios.post("/api/wallet/associate",{
                walletDto: wallet,
                username: user.username,
                read,
                write,
                owner
            });
            this.getAssociations(true);
        },
        async deassociate(wallet: WalletDto,user: UserDto){
            await axios.delete("/api/wallet/associate",{
                data:{
                    walletDto: wallet,
                    username: user.username
                }
            });
            this.getAssociations(true);
        },
        async modifyAssociation(wallet: WalletDto,user: UserDto,read: boolean,write: boolean,owner: boolean){
            await axios.put("/api/wallet/associate",{
                walletDto: wallet,
                username: user.username,
                read,
                write,
                owner
            });
            this.getAssociations(true);
        },
        async getAssociations(force: boolean){
            if(force || this.associations.keys.length == 0){
                let response = await axios.get<Array<UserWalletDto>>("/api/wallet/association");
                this.associations.clear();
                for(let userWallet of response.data){
                    if(!this.associations.has(userWallet.walletDto)){
                        this.associations.set(userWallet.walletDto,[])
                    }
                    this.associations.get(userWallet.walletDto)?.push(userWallet);
                }
            }
        }
    }
})