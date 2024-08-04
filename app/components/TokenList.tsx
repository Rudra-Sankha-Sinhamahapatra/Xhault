/* eslint-disable @next/next/no-img-element */
import { TokenWithbalance } from "../api/hooks/useTokens";

export function TokenList({ tokens }: { tokens: TokenWithbalance[] }) {
  return (
    <div>
      {tokens.map((t) => (
        <TokenRow key={t.name} token={t} />
      ))}
    </div>
  );
}

function TokenRow({ token }: { token: TokenWithbalance }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>
          <img src={token.image} alt="image" className="w-10  mr-2 h-10 rounded-full" />
        </div>
        <div>
            <div className="font-bold">
            {token.name}
            </div>
            <div className="font-semibold">
           <span className="text-slate-800">1</span>  {token.name} = <span className="text-slate-800">${token.price}</span>
            </div>
        </div>
      </div>
      <div>
        <div>
        <div className="font-bold flex justify-end text-slate-700">
            {token.usdBalance}
            </div>
            <div className="font-thin flex justify-end">
             {token.balance} 
            </div>
        </div>
      </div>
    </div>
  );
}
