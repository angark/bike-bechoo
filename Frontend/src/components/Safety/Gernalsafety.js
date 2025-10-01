import React from 'react';
import './Gernalsafety.css';

const Gernalsafety = () => {
  return (
    <div className="vt-container">
      <div className="vt-card" role="region" aria-label="Vehicle transaction safety tips">
        <main className="vt-main">
          <div className="vt-hero">
            <div className="vt-badge">🔒 Safety</div>
            <div>
              <h1>Vehicle transaction — quick safety checklist</h1>
              <p className="lead">Keep these best practices close when buying or selling a vehicle.
              Simple, clear, and focused on protecting your money and identity.</p>
            </div>
          </div>

          <div className="tips-grid">
            <section className="section" aria-labelledby="general-safety">
              <h3 id="general-safety">✅ General Safety Tips for Vehicle Transactions</h3>
              <ul>
                <li>Always meet the buyer or seller in a public, well-lit location—preferably during the day.</li>
                <li>Never scan unknown QR codes or share OTPs with anyone.</li>
                <li>Avoid dealing with individuals from distant cities unless absolutely necessary.</li>
                <li>Keep your bank account details confidential and secure.</li>
                <li>Ensure the ownership transfer process is properly completed once the deal is closed.</li>
              </ul>
            </section>

            <section className="section" aria-labelledby="buyer-tips">
              <h3 id="buyer-tips">🛒 Smart Tips for Buyers</h3>
              <ul>
                <li>Never make advance payments without inspecting the vehicle in person.</li>
                <li>Check and verify all original documents, including RC book, insurance, and ask for the spare key.</li>
                <li>If the price seems too good to be true, it probably is—proceed with caution.</li>
                <li>Verify if the vehicle has any pending loans or financial liabilities.</li>
              </ul>
            </section>

            <section className="section" aria-labelledby="seller-tips">
              <h3 id="seller-tips">🚗 Smart Tips for Sellers</h3>
              <ul>
                <li>Only hand over the vehicle after receiving full and confirmed payment.</li>
                <li>Stay cautious during test drives—accompany the buyer and ensure safety at all times.</li>
                <li className="danger">Do not share OTPs, scanned QR codes or bank PINs with buyers.</li>
              </ul>
            </section>
          </div>
        </main>

        <aside className="right-column" aria-label="Quick actions and notes">
          <div className="cta">
            <strong>Quick checklist</strong>
            <div className="meta" style={{marginTop:8}}>
              <span className="chip">Meet in public</span>
              <span className="chip">No advance payment</span>
              <span className="chip">Verify documents</span>
            </div>
            <p style={{marginTop:10}} className="small-text">Tip: carry a photocopy of your ID and the RC when meeting prospective buyers. Use bank transfer receipts and confirmation screenshots for records.</p>
          </div>

          <div className="cta">
            <strong>Recommended documents</strong>
            <ul style={{marginTop:8}}>
              <li>Original RC copy</li>
              <li>Insurance papers</li>
              <li>PUC / emission certificate (if applicable)</li>
              <li>Spare key</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Gernalsafety;
