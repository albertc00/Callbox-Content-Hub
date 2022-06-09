<script>
  export let post;
  console.log(post);
  const {
    id,
    title: { rendered: title },
    content: { rendered: content },
    featured_image_src: image,
    acf: {
      cs_campaign_types: campaignTypes,
      cs_client_industry: clientIndustry,
      cs_client_location: clientLocation,
      cs_client_hq: clientHQ,
      cs_target_location: targetLocation,
      cs_target_industry: targetIndustry,
      cs_target_dm: targetDM,
      cs_results: results,
      cs_highlights: highlights,
      cs_client: client,
    },
  } = post;
</script>

<div class="wrapper-outer">
  <div class="wrapper-inner">
    <article class="wrapper">
      <header>
        <h3>{title}</h3>
      </header>
      <div class="cs-campaign">
        <div class="cs-specs">
          <div class="cs-wrapper">
            <span class="fa fa-briefcase" />
            <div class="cs-specs-label">Industry</div>
            <div class="cs-specs-post">{clientIndustry}</div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-map-marker-alt" />
            <div class="cs-specs-label">Location</div>
            <div class="cs-specs-post">
              {clientLocation}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-building" />
            <div class="cs-specs-label">Headquarters</div>
            <div class="cs-specs-post">{clientHQ}</div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-chart-line" />
            <div class="cs-specs-label">Campaign Type</div>
            {#each campaignTypes as { label }}
              <ul>
                <li class="cs-specs-post">
                  {label}
                </li>
              </ul>
            {/each}
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-map-marker-alt" />
            <div class="cs-specs-label">Target Location</div>
            <div class="cs-specs-post">
              {targetLocation}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-briefcase" />
            <div class="cs-specs-label">Target Industries</div>
            <div class="cs-specs-post">
              {targetIndustry}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-user" />
            <div class="cs-specs-label">Target Contacts</div>
            <div class="cs-specs-post">
              {targetDM}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-user" />
            <div class="cs-specs-label">Client Name</div>
            <div class="cs-specs-post">
              {client.name}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-user" />
            <div class="cs-specs-label">Client Website</div>
            <div class="cs-specs-post">
              {client.website}
            </div>
          </div>
          <div class="cs-wrapper">
            <span class="fa fa-user" />
            <div class="cs-specs-label">Client LOB</div>
            <div class="cs-specs-post">
              {client.lob}
            </div>
          </div>

          <div class="cs-wrapper">
            <div class="cs-specs-label">Highlights</div>
            <ul>
              {#each highlights as { highlight }}
                <li>{highlight}</li>
              {/each}
            </ul>
          </div>
          <div class="cs-wrapper">
            {@html content}
          </div>
        </div>
      </div>
    </article>
  </div>
</div>

<style>
  header h3 {
    font-size: 1.5rem;
    line-height: 1rem;
    padding-bottom: 10px;
  }
  .cs-wrapper {
    margin-bottom: 15px;
  }
  .cs-wrapper .cs-specs-label {
    font-weight: 600;
    padding-bottom: 5px;
  }
  .cs-specs {
    padding-bottom: 20px;
  }
  ul li,
  .cs-wrapper > :global(ul li),
  .cs-wrapper > :global(ol li) {
    margin-bottom: 8px;
  }
  ul,
  .cs-wrapper > :global(ul),
  .cs-wrapper > :global(ol) {
    margin-left: 20px;
    padding-left: 15px;
  }
  .cs-wrapper > :global(p span),
  .cs-wrapper > :global(p) {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 0;
  }
  .cs-wrapper > :global(h2),
  .cs-wrapper > :global(h3 b) {
    font-weight: 600;
    padding-bottom: 5px;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: 0;
  }

  .wrapper-inner {
    padding-top: 20px;
    /* width: 85%; */
    max-width: 60rem;
    margin: 0 auto;
    padding: 5px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 9px rgb(0 0 0 / 30%);
    background-color: #fff;
  }
  .wrapper-outer {
    padding: 0 20px;
  }
</style>
