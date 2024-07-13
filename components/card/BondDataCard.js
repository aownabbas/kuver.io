import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

function BondDataCard({iconClass,headText,value,compRate}) {
  console.log(value,"value");
  const router=useRouter()
  return (
  <div class="card" style={{ backgroundColor: '#252b3b',minHeight:'19vh' }}>
  <div class="card-body">
    <div class="d-flex">
      <div class="flex-1 overflow-hidden">
        <p class="text-truncate mb-2 text-muted regular-small">{headText}</p>
        <h4 class="mb-0 semibold-large text-white">{value == undefined ? "0" : value}</h4>
      </div>
      <div class="text-primary ms-auto">
        <Image src={iconClass} height={22} width={22} alt='cardImage' />
        {/* <i class={iconClass} style={{ color: 'white' }}></i> */}
      </div>
    </div>
  </div>
{router.pathname !=="/dataTables/AuthorizeUser" ?
  <div class="card-body top-border py-3">
    <div class="text-truncate">
      <span class="badge badge-soft-success text-success font-size-11">
      {compRate !== null && compRate !== undefined ?
      <>  <i class="mdi mdi-menu-up text-success"> </i> {`${compRate }%`}{' '}</>
        :
       <> <i class="mdi mdi-menu-up text-success"> </i>{`--`} {' '}</>
       
      }
      </span>
      <span class="text-muted ms-2 regular-small">From previous period</span>
    </div>
  </div>:""}
</div>
  )
}

export default BondDataCard