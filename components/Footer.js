import React from 'react'

function Footer() {
  return (<footer class="footer" style={{ backgroundColor: '#212734' }}>
  <div class="container-fluid">
    <div class="row">
      {/* <div class="col-sm-6 text-muted regular-small">
        2023 Kuver
      </div> */}
      <div class="text-center">
        <div class=" d-none d-sm-block text-muted regular-small">
          Copyright ® 2023 Kuver | All rights Reserved
          {/* <i class="mdi mdi-heart text-danger"></i>  */}
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer