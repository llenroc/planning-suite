import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {
//  Button,
  Field,
  Text,
  TextInput,
  DropDown,
  theme,
  Badge,
  Table, TableHeader, TableRow, TableCell
} from '@aragon/ui'

import {
  Form,
  FormField,
  FieldTitle,
} from '../../Form'

class NewBountyAllocation extends React.Component {
  static propTypes = {
    /** array of issues to allocate bounties on */
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        level: PropTypes.string,
      })
    ),
    /** base rate in pennies */
    rate: PropTypes.number,
    onSubmit: PropTypes.func.isRequired,
  }

  descriptionChange = e => {
    this.setState({ description: e.target.value })
  }

  constructor(props) {
    super(props)
    let bounties = {}
    this.props.issues.map(issue => {
      bounties[issue.id] = {
        hours: 0,
        exp: 0,
        deadline: 0,
        avail: 0,
        detailsOpen: 0
      }
    })
    this.state = {
      description: '',
      bounties,
    }
    //console.log('constructor: ', bounties)
  }

  configBounty = (id, key, val) => {
    const { bounties } = this.state
    // that's value reversal based on what's already there - special treatment
    if (key == 'detailsOpen') {
      bounties[id][key] = 1 - bounties[id][key]
    } else bounties[id][key] = val
    this.setState({bounties})
    console.log('configBounty: ', bounties)
  }

  generateHoursChange = id => index => {
    this.configBounty(id, 'hours', index)
    console.log('generateHoursChange: id: ', id, ', index: ', index)
  }

  generateExpChange = id => index => {
    this.configBounty(id, 'exp', index)
    console.log('generateExpChange: id: ', id, ', index: ', index)
  }

  generateDeadlineChange = id => index => {
    this.configBounty(id, 'deadline', index)
    console.log('generateExpChange: id: ', id, ', index: ', index)
  }

  generateAvailChange = id => index => {
    this.configBounty(id, 'avail', index)
    console.log('generateExpChange: id: ', id, ', index: ', index)
  }

  generateArrowChange = id => () => {
    this.configBounty(id, 'detailsOpen')
    console.log('generateArrowChange: id: ', id)
  }

  render() {
    const bountyHours = ['-', '5', '10', '15']
    const bountyExp = ['-', 'beginner', 'expert']
    const bountyDeadline = ['-', 'yesterday', 'last week']
    const bountyAvail = ['-', '1', '2', '3']
    const { bounties } = this.state
    //console.log('bounties: ', bounties)
    return (
      <Form
        onSubmit={this.props.onSubmit}
        description={this.props.description}
        submitText="Submit Bounty Allocation"
      >
        <FormField label="Description"
          required
          input={
            <TextInput.Multiline
              rows={3}
              style={{ resize: 'none' }}
              onChange={this.descriptionChange}
              wide
            />
          }
        />
        <FormField label="Issues"
          hint="Enter the estimated hours per issue"
          required
          input={
            <Table>
              {
                this.props.issues.map(issue => (
                  <TableRow key={issue.id}>
                    <Cell>
                      <IBMain>
                        <IssueBounty>
                          <IBArrow
                            direction={bounties[issue.id]['detailsOpen']}
                            onClick={this.generateArrowChange(issue.id)}
                          >></IBArrow>
                          <IBTitle size='normal' weight="bold">{issue.title}</IBTitle>
                          <IBHours>
                            <IBHoursInput>
                              <FieldTitle>Hours</FieldTitle>
                              <DropDown
                                items={bountyHours}
                                onChange={this.generateHoursChange(issue.id)}
                                active={bounties[issue.id]['hours']}
                              />
                            </IBHoursInput>
                          </IBHours>
                          <IBValue>
                            {
                              (issue.id in bounties && bounties[issue.id] > 0) && (
                                <IBValueShow>
                                  <FieldTitle>$100</FieldTitle>
                                  <Badge>10 ANT</Badge>
                                </IBValueShow>
                              )
                            }
                          </IBValue>
                        </IssueBounty>
                        <IBDetails open={bounties[issue.id]['detailsOpen']}>
                          <IBExp>
                            <FormField
                              label="Experience level"
                              input={
                                <DropDown
                                  items={bountyExp}
                                  onChange={this.generateExpChange(issue.id)}
                                  active={bounties[issue.id]['exp']}
                                />
                              }
                            />
                          </IBExp>
                          <IBDeadline>
                            <FormField
                              label="Deadline"
                              input={
                                <DropDown
                                  items={bountyDeadline}
                                  onChange={this.generateDeadlineChange(issue.id)}
                                  active={bounties[issue.id]['deadline']}
                                />
                              }
                            />
                          </IBDeadline>
                          <IBAvail>
                            <FormField
                              label="Num. Available"
                              input={
                                <DropDown
                                  items={bountyAvail}
                                  onChange={this.generateAvailChange(issue.id)}
                                  active={bounties[issue.id]['avail']}
                                />
                              }
                            />
                          </IBAvail>
                        </IBDetails>
                      </IBMain>
                    </Cell>
                  </TableRow>
                )
                )
              }
            </Table>
          }
        />
      </Form>
    )
  }
}

const Cell = styled(TableCell)`
  padding: 0px;
`
const IBMain = styled.div`
  display: flex;
  flex-flow: column;
`
const IssueBounty = styled.div`
  clear: all;
  display: grid;
  grid-template-columns: 41px 159px auto;
  grid-template-rows: auto;
  grid-template-areas:
    "arrow title title"
    "arrow hours value";
`
const IBTitle = styled(Text)`
    grid-area: title;
    line-height: 42px;
}
`
const IBHours = styled.div`
    grid-area: hours;
`
const IBExp = styled.div`
    grid-area: exp;
`
const IBDetails = styled.div`
  display: ${({ open }) => (open ? 'grid' : 'none')};
  grid-template-columns: 41px 159px auto;
  grid-template-rows: auto;
  grid-template-areas:
    ".     exp   dline"
    ".     avail .    ";
`
const IBDeadline = styled.div`
    grid-area: dline;
`
const IBAvail = styled.div`
    grid-area: avail;
`
const IBValue = styled.div`
  grid-area: value;
`
const IBValueShow = styled.div`
  display: inline-flex;
  position: relative;
    justify-content: center;
  > :first-child {
    height: 40px;
    width: 45px;
    line-height: 40px;
  }
  > :last-child {
margin: 10px 0px;
  }
`
const IBArrow = styled.div`
  grid-area: arrow;
  place-self: center;
  transform: ${({ direction }) => (direction ? 'rotate(-90deg)' : 'rotate(90deg)')};
  font-size: 17px;
  line-height: 17px;
`
const IBHoursInput = styled.div`
  display: inline-flex;
  position: relative;
  margin-bottom: 10px;
  > :first-child {
    height: 40px;
    width: 45px;
    line-height: 40px;
  }
  > :last-child {
    width: 65px;
    height: 40px;
  }
`

export default NewBountyAllocation